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
	public CommandLineRunner initData(GameRepository repositoryGame, PlayerRepository repositoryPlayer, GamePlayerRepository gamePlayerRepository, ShipRepository shipRepository) {
		return (args) -> {

			Player player1 = new Player("jack@gmx.de");
			Player player2 = new Player("bauer@gmx.de");
			Player player3 = new Player("jan@gmx.de");


			Date date = new Date();
			Date dateTwo = Date.from(date.toInstant().plusSeconds(3600));
			Date dateThree = Date.from(date.toInstant().plusSeconds(7200));

			GamePlayer readyPlayerOne = new GamePlayer(date);
			GamePlayer readyPlayerTwo = new GamePlayer(date);
			GamePlayer readyPlayerThree = new GamePlayer(date);
			GamePlayer readyPlayerFour = new GamePlayer(date);



			Game gameOne = new Game(date);
			Game gameTwo = new Game(dateTwo);
			//Game gameThree = new Game(date);

			player1.addGamePlayer(readyPlayerOne);
			player2.addGamePlayer(readyPlayerTwo);

			gameOne.addGamePlayer(readyPlayerOne);
			gameOne.addGamePlayer(readyPlayerTwo);


			player2.addGamePlayer(readyPlayerFour);
			player3.addGamePlayer(readyPlayerThree);

			gameTwo.addGamePlayer(readyPlayerFour);
			gameTwo.addGamePlayer(readyPlayerThree);


			List<String> location1 = Arrays.asList("A1", "A2", "A3");
			List<String> location2 = Arrays.asList("B1", "B2", "B3");

			Ship destroyer = new Ship("Destroyer", location1);
			Ship destroyerTwo = new Ship("Destroyer", location2);

			readyPlayerOne.addShip(destroyer);
			readyPlayerOne.addShip(destroyerTwo);



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
		};

	}

}