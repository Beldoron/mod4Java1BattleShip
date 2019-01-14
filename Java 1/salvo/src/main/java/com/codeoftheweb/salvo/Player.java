package com.codeoftheweb.salvo;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;

    @OneToMany(mappedBy="player", fetch=FetchType.EAGER)
    Set<GamePlayer> gamePlayers = new HashSet<>();


    @OneToMany(mappedBy="player", fetch= FetchType.EAGER)
    Set<Score> scores = new HashSet<>();

    private String userName;



    public Player() { }

    public Player(String email) {

        this.userName = email;
    }



    public Set<Score> getScores() {
        if(scores != null) {
            return scores;
        }
        return null;
    }

    public void setScores(Set<Score> scores) {
        this.scores = scores;
    }

    public void addPlayer(Score score) {
        score.setPlayer(this);
        scores.add(score);
    }




        public void addGamePlayer(GamePlayer gamePlayer) {
        gamePlayer.setPlayer(this);
        gamePlayers.add(gamePlayer);
    }

    public String getUserName() {
        return userName;
    }

    public long getPlayerId() {
        return id;
    }

    public void setPlayerId(long id) {
        this.id = id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    //@JsonIgnore
    public List<Game> getGames(){

        return gamePlayers.stream().map(jada -> jada.getGame()).collect(Collectors.toList());
    }


    public String toString() {
        return  " the Username is " + userName;
    }


}





    /*

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    */