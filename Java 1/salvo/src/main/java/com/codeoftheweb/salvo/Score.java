

package com.codeoftheweb.salvo;

        import com.fasterxml.jackson.annotation.JsonIgnore;
        import javax.persistence.*;
        import java.util.Date;

@Entity
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Date date;
    private double playersScore;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="player_id")
    private Player player;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="game_id")
    private Game game;

    public Score() {}

    public Score(double playersScore, Date date) {
        this.playersScore = playersScore;
        this.date = date;


    }

    public long getScoreId() {
        return id;
    }

    public void setScoreId(long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public double getPlayersScores() {
        return playersScore;
    }

    public void setPlayersScores(double playersScore) {
        this.playersScore = playersScore;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }
}