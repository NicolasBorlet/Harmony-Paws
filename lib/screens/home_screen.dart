import 'package:flutter/material.dart';
import '../widgets/destination_slider.dart';
import '../widgets/destination_card.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Destinations de Voyage'),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            DestinationSlider(
              title: 'Europe',
              destinations: [
                DestinationCard(
                  imageUrl: 'https://picsum.photos/200',
                  cityName: 'Paris',
                  description: 'La ville lumière',
                ),
                DestinationCard(
                  imageUrl: 'https://picsum.photos/200',
                  cityName: 'Rome',
                  description: 'La ville éternelle',
                ),
              ],
            ),
            DestinationSlider(
              title: 'Asie',
              destinations: [
                DestinationCard(
                  imageUrl: 'https://picsum.photos/200',
                  cityName: 'Tokyo',
                  description: 'La ville du futur',
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}