package com.codeoftheweb.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
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

    @RequestMapping("/games")
    public List<Map<String, Object>> getAll() {
        return gameRepository.findAll().stream().map(game -> new HashMap<String, Object>(){{
            put("id", game.getGameId());
            put("crationDate", game.getGameDate());
                put("gameplayer", game.getGamePlayers().stream().map(gameplayer -> new HashMap<String, Object>(){{
                    put("id", gameplayer.getGamePlayerId());
                    put("player", new HashMap<String, Object>(){{
                        put("id", gameplayer.getPlayer().getPlayerId());
                        put("email", gameplayer.getPlayer().getUserName());
                    }});
                }}).collect(toList()));
        }}).collect(toList());

    }

    @RequestMapping("/game_view/{nn}")
    public Map<String, Object> findGamePlayer(@PathVariable Long nn) {



        Map<String, Object> findgameplayer = new HashMap<>();
        GamePlayer gamePlayer = gamePlayerRepository.findById(nn);

        Set<Player> playerSet = gamePlayer.getGame().getPlayers();
        Set<GamePlayer> gamePlayerSet = gamePlayer.getGame().gamePlayers;

        findgameplayer.put("playerid", gamePlayer.getPlayer().getPlayerId());
        findgameplayer.put("gameplayerid",gamePlayer.getGamePlayerId());
        findgameplayer.put("gameplayers", gamePlayerSet(gamePlayer.getGame().getGamePlayers()));
        findgameplayer.put("ships", shipSet(gamePlayer.getShips()));
        findgameplayer.put("salvoes", salvoSet(gamePlayer.getSalvos()));
        findgameplayer.put("salvoesOpponents", salvoSet(gamePlayer.getOpponentsSalvoes(gamePlayer)));

        return findgameplayer;
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

    private List<Map<String, Object>> gamePlayerSet (Set<GamePlayer> gamePlayer) {
        return gamePlayer.stream().map(gameplayer-> gameplayerMap(gameplayer)).collect(toList());
    }

    private List<Map<String, Object>> shipSet (Set<Ship> ships) {
        return ships.stream().map(ship-> shipsMap(ship)).collect(toList());
    }

    private List<Map<String, Object>> salvoSet (Set<Salvo> salvoes) {
        return salvoes.stream().map(salvo-> salvoesMap(salvo)).collect(toList());
    }

}







