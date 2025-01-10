import 'package:flutter/material.dart';

class TripsScreen extends StatelessWidget {
  const TripsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('TripsScreen'),
      ),
      body: const Center(
        child: Text(
          'Welcome to TripsScreen!',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}