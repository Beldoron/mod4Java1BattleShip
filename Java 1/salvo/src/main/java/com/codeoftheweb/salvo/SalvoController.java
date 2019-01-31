package com.codeoftheweb.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;


@RestController
@RequestMapping("/api")

public class SalvoController {

    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private GamePlayerRepository gamePlayerRepository;
    @Autowired
    private PlayerRepository playerRepository;


    public Boolean userLoggedIn (Authentication authentication) {
        if (authentication == null) {
            return false;
        } else {
            return true;
        }
    }

    public Player currentUser(Authentication authentication) {
        if (userLoggedIn(authentication)) {
            return playerRepository.findByUserName(authentication.getName());
        }
        return null;
    }



    public List<Map<String, Object>> getAll() {

        return gameRepository.findAll().stream().map(game -> new HashMap<String, Object>(){{
                put("id", game.getGameId());
                put("crationDate", game.getGameDate());
                put("gameplayer", game.getGamePlayers().stream().map(gameplayer -> new HashMap<String, Object>(){{
                    put("id", gameplayer.getGamePlayerId());
                    put("player", new HashMap<String, Object>(){{
                        put("id", gameplayer.getPlayer().getPlayerId());
                        put("email", gameplayer.getPlayer().getUserName());
                        put("gpid", gameplayer.getGamePlayerId());
                    }});
                }}).collect(toList()));
            }}).collect(toList());

    }

    @RequestMapping("/games")
    public Map<String, Object> getAll(Authentication authentication) {
        Map<String, Object> games = new LinkedHashMap<>();
        if (!userLoggedIn(authentication)) {
            games.put("Active_User", null);
        } else {
            games.put("Active_User", currentPlayerMap(currentUser(authentication)));
        }
       games.put("games", getAll());
        return games;
    }


    @RequestMapping("/leader_board")
    public  List<Map<String, Object>> getScores () {
       return playerRepository.findAll().stream().map(player -> new HashMap<String, Object>(){{
            put("user_Name", player.getUserName());
            put("wins", getWins(player));
            put("lost", getLost(player));
            put("tide", getTide(player));
        }}).collect(toList());
    }

    @RequestMapping(value="/players", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> register(String email, String password) {
        if ((email == "") || (password == "")) {
            return new ResponseEntity<>(information("Error", "Fill out all fields"), HttpStatus.FORBIDDEN);
        } else if (playerRepository.findByUserName(email) == null) {
                playerRepository.save(new Player(email, password));
                return new ResponseEntity<>(information("Success", "You are successfully Registered"), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(information("Error", "User name is already used"), HttpStatus.FORBIDDEN);
            }
        }

    @RequestMapping(value = "/games", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> createNewGame(Authentication authentication) {
        if (!userLoggedIn(authentication)) {
            return new ResponseEntity<>(information("Error", "please login"), HttpStatus.UNAUTHORIZED);
        } else {
            Date date = new Date();
            Game game = new Game(date);
            gameRepository.save(game);

            GamePlayer gamePlayer = new GamePlayer(date);
            currentUser(authentication).addGamePlayer(gamePlayer);
            game.addGamePlayer(gamePlayer);
            gamePlayerRepository.save(gamePlayer);
            return new ResponseEntity<>(simpleMap("gpid", gamePlayer.getGamePlayerId()),HttpStatus.CREATED);
        }
    }

    private Map<String, Object> simpleMap(String key, Object value) {
        Map<String, Object> map = new HashMap<>();
        map.put(key, value);
        return map;
    }

    @RequestMapping(value = "/game/{id}/players", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> joinGame(@PathVariable long id, Authentication authentication) {
        if (!userLoggedIn(authentication)) {
            return new ResponseEntity<>(information("Error", "please login"), HttpStatus.UNAUTHORIZED);
        } else {
            Date date = new Date();
            Game game = gameRepository.findById(id);
            GamePlayer gamePlayer = new GamePlayer(date);
            currentUser(authentication).addGamePlayer(gamePlayer);
            game.addGamePlayer(gamePlayer);
            gamePlayerRepository.save(gamePlayer);
            return new ResponseEntity<>(simpleMap("gpid", gamePlayer.getGamePlayerId()),HttpStatus.CREATED);
        }
    }


    private long getWins (Player player) {
//        int wins = 0;
 /*       player.getScores().stream().forEach(score -> {

            if(score.getPlayersScores() == 1) {
                wins ++;
            }
        });*/
        return player.getScores().stream().filter(score -> score.getPlayersScores() == 1).count();
//        return  wins;
    }

    private  long getLost (Player player) {
        return player.getScores().stream().filter(score -> score.getPlayersScores() == 0).count();
    }
    private  long getTide (Player player) {
        return player.getScores().stream().filter(score -> score.getPlayersScores() == 0.5).count();
    }
/*
    @RequestMapping("/leader_board")
    public List<Map<String, Object>> getScores() {
        return playerRepository.findAll().stream().map(player -> new HashMap<String, Object>(){{
                put("player_ID", player.getPlayerId());
                put("user_Name", player.getUserName());
                put("scores", player.getScores());
            }}).collect(toList());
    }
*/

    private Map<String, Object> information(String key, Object value) {
        Map<String, Object> map = new HashMap<>();
        map.put("status", key);
        map.put("message", value);
        return map;
    }




    @RequestMapping("/game_view/{nn}")
    public ResponseEntity <Map<String, Object>> findGamePlayer(@PathVariable long nn, Authentication authentication) {
        System.out.println(nn);
        GamePlayer gamePlayer = gamePlayerRepository.findOne(nn);
        if (gamePlayer.getPlayer() == currentUser(authentication)) {
            return new ResponseEntity<>(findGP(gamePlayer), HttpStatus.OK);



        }
        return new ResponseEntity<>(information("Error", "You have to login"), HttpStatus.UNAUTHORIZED);
    }



    private Map<String, Object> findGP(GamePlayer gamePlayer) {
    Map<String, Object> findgp = new LinkedHashMap<String, Object>();
        System.out.println(gamePlayer.getGamePlayerId());
        System.out.println(gamePlayer.getGame().getGamePlayers());
    //Set<Player> playerSet = gamePlayer.getGame().getPlayers();
    //Set<GamePlayer> gamePlayerSet = gamePlayer.getGame().gamePlayers;
        findgp.put("playerid", gamePlayer.getPlayer().getPlayerId());
        findgp.put("gameplayerid", gamePlayer.getGamePlayerId());
        findgp.put("gameplayers", gamePlayerSet(gamePlayer.getGame().getGamePlayers()));
        findgp.put("ships", shipSet(gamePlayer.getShips()));
        findgp.put("salvoes", salvoSet(gamePlayer.getSalvos()));
        findgp.put("salvoesOpponents", salvoSet(gamePlayer.getOpponentsSalvoes(gamePlayer)));

        return findgp;
    }

    private Map<String, Object> currentPlayerMap(Player player) {
        Map<String, Object> currentplayermap = new LinkedHashMap<String, Object>();
        currentplayermap.put("playerId", player.getPlayerId());
        currentplayermap.put("userName", player.getUserName());

        return currentplayermap;
    }

    private Map<String, Object> salvoesMap(Salvo salvo) {
        Map<String, Object> salvomap = new LinkedHashMap<String, Object>();
        salvomap.put("gameplayer_id", salvo.getGamePlayer().getPlayer().getPlayerId());
        salvomap.put("turnNumber", salvo.getTurnNumber());
        salvomap.put("salvo_location", salvo.getLocation());
        return salvomap;
    }

    private Map<String, Object> gameplayerMap(GamePlayer gamePlayer) {
        Map<String, Object> gameplayermap = new LinkedHashMap<String, Object>();
        gameplayermap.put("gameplayer_id", gamePlayer.getGamePlayerId());
        gameplayermap.put("player", playerMap(gamePlayer.getPlayer()));
        return gameplayermap;
    }

    private Map<String, Object> playerMap(Player player) {
        Map<String, Object> playermap = new LinkedHashMap<String, Object>();
        playermap.put("player_id", player.getPlayerId());
        playermap.put("User_name", player.getUserName());
        return playermap;
    }

    private Map<String, Object> shipsMap(Ship ship) {
        Map<String, Object> shipsmap = new LinkedHashMap<String, Object>();
        shipsmap.put("ship_type", ship.getShiptype());
        shipsmap.put("ship_location", ship.getLocation());
        return shipsmap;
    }

    private List<Map<String, Object>> gamePlayerSet (Set<GamePlayer> gamePlayers) {
        if (gamePlayers.size() != 0) {
            return gamePlayers.stream().map(gpmap -> gameplayerMap(gpmap)).collect(toList());
        } else {
            return null;
        }
    }

    private List<Map<String, Object>> shipSet (Set<Ship> ships) {
        if (ships.size() != 0) {
            return ships.stream().map(ship -> shipsMap(ship)).collect(toList());
        } else {
            return null;
        }
    }

    private List<Map<String, Object>> salvoSet (Set<Salvo> salvoes) {
        System.out.println(salvoes);
        return salvoes.stream().map(salvo-> salvoesMap(salvo)).collect(toList());
    }
}








