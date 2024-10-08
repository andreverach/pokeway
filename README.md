# Dr. Huemura - Pokémon App

[![Netlify Status](https://api.netlify.com/api/v1/badges/1a58e67d-133b-42eb-9728-6a5a149f6ede/deploy-status)](https://app.netlify.com/sites/drhuemura/deploys)

## Description

Dr. Huemura, is a Pokémon web application developed with **Angular 18**, taking advantage of its new features such as **signals**, **standalone components**, **lazy loading**, **services** and **pipes**, in a **clean architecture** framework. The application consumes the **[PokeAPI](https://pokeapi.co/)** API to obtain real-time information about different Pokémon.

### Features

- **Pokémon List**: Displays a list of all pokémon, allowing you to filter by type.
- **Pokedex**: Detailed information about each Pokémon, including images, statistics, and evolution chain.
- **Finder**: Find any pokémon and quickly access its detailed information.

### Tech stack

- **Angular 18**: Modern frontend framework with new features.
  - **Signals**: Used to manage the reactive state in the application.
  - **Standalone Components**: Standalone components for flexibility and modularity.
  - **Lazy Loading**: Improves performance by loading only what is needed when needed.
  - **Services and Pipes**: For business logic and data transformations.
- **TailwindCSS**: CSS framework for responsive and stylish design.
- **PokeAPI**: Public API to obtain Pokémon information.
- **Netlify**: Platform used for application deployment.

## Demo

See the application deployed in Netlify at the following link:

🔗 [Dr. Huemura Demo](https://pokemon-angular18-app.netlify.app)

## Screenshots

### Página principal - Listado de Pokémon
![Pokemon list](https://drhuemura.netlify.app/assets/images/pokemon-list.png)

### Información detallada de un Pokémon
![Pokedex](https://drhuemura.netlify.app/assets/images/detail-pokemon.png)

## Installation and local use

Follow these steps to clone and run the application locally:

### Prerequisites

- **Node.js** (v18)
- **Angular CLI** (v18)

### Instructions

1. Clona el repositorio:

   ```bash
   git clone https://github.com/your-username/pokemon-angular-app.git
   ```

   ```bash
   cd pokemon-angular-app
   ```

   ```bash
   npm install
   ```

   ```bash
   ng serve -o
   ```