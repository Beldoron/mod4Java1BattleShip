package com.codeoftheweb.salvo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;


import java.util.Arrays;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class SalvoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalvoApplication.class, args);
	}

	@Bean
	public CommandLineRunner initData(GameRepository repositoryGame, PlayerRepository repositoryPlayer, GamePlayerRepository gamePlayerRepository, ShipRepository shipRepository, SalvoRepository salvoRepository, ScoresRepository scoresRepository) {
		return (args) -> {

			Player player1 = new Player("jack@gmx.de");
			Player player2 = new Player("bauer@gmx.de");
			Player player3 = new Player("jan@gmx.de");


			Date date = new Date();
			Date dateTwo = Date.from(date.toInstant().plusSeconds(1800));
			//System.out.println(dateTwo);


			GamePlayer readyPlayerOne = new GamePlayer(date);
			GamePlayer readyPlayerTwo = new GamePlayer(date);
			GamePlayer readyPlayerThree = new GamePlayer(date);
			GamePlayer readyPlayerFour = new GamePlayer(date);



			Game gameOne = new Game(date);
			Game gameTwo = new Game(dateTwo);
			//Game gameThree = new Game(date);
			// nur creationdateDate und Score, player in scores relation

			Score scoreOne = new Score(1.0, dateTwo);
			Score scoreTwo = new Score(0.5, dateTwo);
			Score scoreThree = new Score(0.0, dateTwo);
			Score scoreFour = new Score(0.0, dateTwo);
			Score scoreFive = new Score(1.0, dateTwo);
			Score scoreSix = new Score(1.0, dateTwo);
			Score scoreSeven = new Score(0.5, dateTwo);
			Score scoreEight = new Score(0.5, dateTwo);
			Score scoreNine = new Score(0.5, dateTwo);
			Score scoreTen = new Score(1.0, dateTwo);
			Score scoreEleven = new Score(1.0, dateTwo);


			player1.addPlayer(scoreTwo);
			player1.addPlayer(scoreOne);
			player1.addPlayer(scoreThree);
			player1.addPlayer(scoreFour);
			player2.addPlayer(scoreFive);
			player2.addPlayer(scoreSix);
			player2.addPlayer(scoreSeven);
			player2.addPlayer(scoreEight);
			player3.addPlayer(scoreNine);
			player3.addPlayer(scoreTen);
			player3.addPlayer(scoreEleven);
			//player1.addPlayer(scoreOne);

			//System.out.println(scoreOne);
			//System.out.println(scoreOne);

			gameOne.addScore(scoreOne);
			gameOne.addScore(scoreTwo);

			player1.addGamePlayer(readyPlayerOne);
			player3.addGamePlayer(readyPlayerTwo);

			gameOne.addGamePlayer(readyPlayerOne);
			gameOne.addGamePlayer(readyPlayerTwo);


			player2.addGamePlayer(readyPlayerFour);
			player3.addGamePlayer(readyPlayerThree);

			gameTwo.addGamePlayer(readyPlayerFour);
			gameTwo.addGamePlayer(readyPlayerThree);


			List<String> location1 = Arrays.asList("E1", "F2", "G3", "H4", "I5" );
			List<String> location2 = Arrays.asList("B1", "B2", "B3");

			List<String> location3 = Arrays.asList("E1", "F1", "G1", "H1", "I1" );
			List<String> location4 = Arrays.asList("C1", "C2", "C3");

			List<String> salvo1 = Arrays.asList("A1");
			List<String> salvo2 = Arrays.asList("B1");
			List<String> salvo3 = Arrays.asList("C1");
			List<String> salvo4 = Arrays.asList("D1");
			List<String> salvo5 = Arrays.asList("E1");

			List<String> salvo6 = Arrays.asList("A2");
			List<String> salvo7 = Arrays.asList("B2");
			List<String> salvo8 = Arrays.asList("C2");
			List<String> salvo9 = Arrays.asList("D2");
			List<String> salvo10 = Arrays.asList("E2");


			Salvo turnOne = new Salvo(1, salvo1);
			Salvo turnTwo = new Salvo(2, salvo2);
			Salvo turnThree = new Salvo(3, salvo3);
			Salvo turnFour = new Salvo(4, salvo4);
			Salvo turnFive = new Salvo(5, salvo5);

			Salvo turnSix = new Salvo(1, salvo6);
			Salvo turnSeven = new Salvo(2, salvo7);
			Salvo turnEight = new Salvo(3, salvo8);
			Salvo turnNine = new Salvo(4, salvo9);
			Salvo turnTen = new Salvo(5, salvo10);


			Ship destroyer = new Ship("Fregatte", location1);
			Ship destroyerTwo = new Ship("Destroyer", location2);

			Ship destroyerThree = new Ship("Fregatte", location3);
			Ship destroyerFour = new Ship("Destroyer", location4);

			readyPlayerOne.addShip(destroyer);
			readyPlayerOne.addShip(destroyerTwo);

			readyPlayerOne.addSalvo(turnOne);
			readyPlayerOne.addSalvo(turnTwo);
			readyPlayerOne.addSalvo(turnThree);
			readyPlayerOne.addSalvo(turnFour);
			readyPlayerOne.addSalvo(turnFive);

			readyPlayerTwo.addShip(destroyerThree);
			readyPlayerTwo.addShip(destroyerFour);

			readyPlayerTwo.addSalvo(turnSix);
			readyPlayerTwo.addSalvo(turnSeven);
			readyPlayerTwo.addSalvo(turnEight);
			readyPlayerTwo.addSalvo(turnNine);
			readyPlayerTwo.addSalvo(turnTen);


			repositoryGame.save(gameOne);
			repositoryGame.save(gameTwo);

			//repositoryGame.save(new Game(dateTwo));
			//repositoryGame.save(new Game(dateThree));

			repositoryPlayer.save(player1);
			repositoryPlayer.save(player2);
			repositoryPlayer.save(player3);

			gamePlayerRepository.save(readyPlayerOne);
			gamePlayerRepository.save(readyPlayerTwo);
			gamePlayerRepository.save(readyPlayerThree);
			gamePlayerRepository.save(readyPlayerFour);

			shipRepository.save(destroyer);
			shipRepository.save(destroyerTwo);
			shipRepository.save(destroyerThree);
			shipRepository.save(destroyerFour);

			salvoRepository.save(turnOne);
			salvoRepository.save(turnTwo);
			salvoRepository.save(turnThree);
			salvoRepository.save(turnFour);
			salvoRepository.save(turnFive);

			salvoRepository.save(turnSix);
			salvoRepository.save(turnSeven);
			salvoRepository.save(turnEight);
			salvoRepository.save(turnNine);
			salvoRepository.save(turnTen);

			scoresRepository.save(scoreOne);
			scoresRepository.save(scoreTwo);
			scoresRepository.save(scoreThree);
			scoresRepository.save(scoreFour);
			scoresRepository.save(scoreFive);
			scoresRepository.save(scoreSix);
			scoresRepository.save(scoreSeven);
			scoresRepository.save(scoreEight);
			scoresRepository.save(scoreNine);
			scoresRepository.save(scoreTen);
			scoresRepository.save(scoreEleven);
		};

	}

}