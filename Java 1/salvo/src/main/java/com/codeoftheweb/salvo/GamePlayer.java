package com.codeoftheweb.salvo;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class GamePlayer {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
        @GenericGenerator(name = "native", strategy = "native")
        private long id;

        @JsonIgnore
        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name="game_id")
        private Game game;
        private Date date;

        @JsonIgnore
        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name="player_id")
        private Player player;

        @OneToMany(mappedBy="gamePlayer", fetch=FetchType.EAGER)
        private Set<Ship> shipTypes = new HashSet<>();

        @OneToMany(mappedBy="gamePlayer", fetch=FetchType.EAGER)
        private Set<Salvo> salvo = new HashSet<>();


        public GamePlayer() { }

        public GamePlayer(Date date) { this.date = date; }

        public long getGamePlayerId() {
        return id;
        }

        public void setGamePlayerId(long id) {
        this.id = id;
        }

        public Player getPlayer() {
        return player;
        }

        public void addShip(Ship shipType) {
                shipType.setGamePlayer(this);
                shipTypes.add(shipType);
        }

        public Set<Ship> getShips() {
                return shipTypes;
        }

        public void setShips(Set<Ship> ships) {
                this.shipTypes = ships;
        }

        public  void addSalvo(Salvo salvo) {
                salvo.setGamePlayer(this);
                this.salvo.add(salvo);
        }





        public Set<Salvo> getOpponentsSalvoes(GamePlayer gamePlayer) {
                if (this.getGame().getOpponent(gamePlayer) != null) {
                        return this.getGame().getOpponent(gamePlayer).getSalvos();
                }
                return null;
        }

        public Set<Salvo> getSalvos() { return salvo; }

        public void setSalvos(Set<Salvo> salvos) { this.salvo = salvos; }

        public void setPlayer(Player player) {
        this.player = player;
        }

        public Game getGame() {
        return game;
        }

        public void setGame(Game game) {
        this.game = game;
        }





        public String toString() {
        return  " Player : " + player + " played at :" +  game ;
        }
}

/*

        public LinkedHashMap<String, Object> getScoreInGame(Game game){

                return player.getScores()
                        .stream().filter(score -> game.equals(score.getGame()))
                        .map(score -> new LinkedHashMap<String, Object>(){{
                                put("id", score.getScoreId());
                                put("scorePoint", score.getScore());

                        }})
                        .findFirst()
                        .orElse(null);
        }
 */






