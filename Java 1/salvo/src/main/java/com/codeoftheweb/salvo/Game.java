package com.codeoftheweb.salvo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;


    @OneToMany(mappedBy="game", fetch=FetchType.EAGER)
    Set<GamePlayer> gamePlayers = new HashSet<>();

    @OneToMany(mappedBy="player", fetch= FetchType.EAGER)
    Set<Score> scores = new HashSet<>();

    private Date date;


    public Game() { }

    public Game(Date date) {
        this.date = date;


    }

    public Set<Score> getScores() {
        return scores;
    }

    public void setScores(Set<Score> scores) {
        this.scores = scores;
    }

    public void addScore(Score score) {
        score.setGame(this);
        scores.add(score);
    }

    public void addGamePlayer(GamePlayer gamePlayer) {
        gamePlayer.setGame(this);
        gamePlayers.add(gamePlayer);
    }

    public Date getGameDate() {
        return date;
    }

    public Set<GamePlayer> getGamePlayers() {
        return gamePlayers;
    }

    public void setGamePlayers (Set<GamePlayer> gamePlayers) {
        this.gamePlayers = gamePlayers;
    }

    public long getGameId() {
        return id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Set<Player> getPlayers() {
        Set<Player> playersSet = new HashSet<>();
        for (GamePlayer gameplayer: gamePlayers) {
            playersSet.add(gameplayer.getPlayer());
        }
        return playersSet;
    }

    public GamePlayer getOpponent(GamePlayer currentGamePlayer) {
        for (GamePlayer otherGamePlayer: this.gamePlayers) {
            if (currentGamePlayer.getGamePlayerId() != otherGamePlayer.getGamePlayerId()) {
                return otherGamePlayer;
            }
        }
        return null;
    }




    public void setPlayerId(long id) {
        this.id = id;
    }

    public void setGameDate(Date date) {
        this.date = date;
    }

    public String toString() {
        return  " the Username is " + date;
    }

    public long id(){
        return id;
    }
    @JsonIgnore
    public List<Player> getplayers(){

        return gamePlayers.stream().map(jada -> jada.getPlayer()).collect(Collectors.toList());
    }
}

// date.from  date to instant()

