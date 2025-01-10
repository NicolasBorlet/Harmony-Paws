import 'package:flutter/material.dart';

class DestinationSlider extends StatelessWidget {
  final String title;
  final List<Widget> destinations;

  const DestinationSlider({
    required this.title,
    required this.destinations,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.all(16.0),
          child: Text(
            title,
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        SizedBox(
          height: 250,
          child: ListView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            children: destinations,
          ),
        ),
      ],
    );
  }
} 