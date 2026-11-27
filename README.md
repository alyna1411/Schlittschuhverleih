# ⛸️ Schlittschuhverleih

Eine Full-Stack-Webanwendung (SPA) zur digitalen Verwaltung eines Schlittschuhverleihs, entwickelt mit
**Vue 3**, **JavaScript**, **Vite**, **C# / ASP.NET Core**, **Entity Framework Core** und **SQLite**.

Die Anwendung wird inkrementell entwickelt und soll zentrale Prozesse eines Schlittschuhverleihs abbilden,
darunter die Bestands- und Lagerverwaltung sowie die Ausleihe und Rückgabe von Schlittschuhen.

Schlittschuhverleih demonstriert moderne Full-Stack-Entwicklung, domänenorientierte Konzepte und eine klare
Trennung der Verantwortlichkeiten.


## 🚀 Funktionen


### Schlittschuhverwaltung (geplant)

- Erfassung und Anzeige von Schlittschuhbeständen
- Änderung von Bestandsmengen
- Wechsel von Lagerorten
- Löschen von Bestandseinträgen
- Validierung fachlicher Geschäftsregeln


### Ausleihe und Rückgabe (geplant)

- Ausleihe verfügbarer Schlittschuhe
- Generierung eindeutiger Rückgabecodes
- Anzeige aktiver Ausleihen
- Rückgabe anhand eines Rückgabecodes
- Automatische Aktualisierung der verfügbaren Bestände


### Lagerverwaltung (implementiert)

- Anzeige vorhandener Lagerorte
- Verwaltung der Lagerkapazitäten


## 🛠️ Technologie-Stack


### Backend

- C#
- .NET 10
- ASP.NET Core
- Entity Framework Core
- SQLite
- REST API + OpenAPI


### Frontend

- Vue 3
- JavaScript
- Vite
- Vue Router
- Fetch API


## 🏗️ Architektur

Schlittschuhverleih wird als modularer Monolith mit einer schichtenorientierten Architektur 
entwickelt, die sich an den Prinzipien der Clean Architecture orientiert.


```bash
Vue 3 Frontend
    ↓
ASP.NET Core API (Controllers)
    ↓
Application Layer (Services, DTOs, Interfaces)
    ↓
Domain Layer (Entities, Rules)
    ↓
Infrastructure Layer (EF Core, DbContext, Migrations)
    ↓
SQLite Database
```

Die Abhängigkeiten zwischen den Schichten werden mittels Dependency Injection (DI) aufgelöst.


## 📁 Projektstruktur

```bash
Schlittschuhverleih/
├── .gitignore
├── README.md
│
├── backend/
│   ├── Application/
│   │   ├── DTOs/
│   │   │   ├── Rentals/
│   │   │   ├── Skates/
│   │   │   └── Storage/
│   │   │       └── StorageLocationResponseDto.cs
│   │   ├── Interfaces/
│   │   │   └── IStorageRepository.cs
│   │   └── Services/
│   │       └── StorageService.cs
│   ├── Controllers/
│   │   └── StorageController.cs
│   ├── Domain/
│   │   ├── Entities/
│   │   │   └── StorageLocation.cs
│   │   └── Rules/
│   │       └── StorageRules.cs
│   ├── Infrastructure/
│   │   ├── Api/
│   │   ├── Persistence/
│   │   │   ├── Configurations/
│   │   │   │   └── StorageLocationConfiguration.cs
│   │   │   ├── Migrations/
│   │   │   ├── Seed/
│   │   │   │   └── StorageLocationSeeder.cs
│   │   │   └── SkateDbContext.cs
│   │   └── Repositories/
│   │       └── StorageRepository.cs
│   ├── Properties/
│   │   └── launchSettings.json
│   ├── appsettings.json
│   ├── appsettings.Development.json
│   ├── backend.csproj
│   └── Program.cs
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── skates/
│   │   ├── components/
│   │   │   └── ui/
│   │   │       └── ToastNotification.vue
│   │   ├── composables/
│   │   │   └── useRentalSystem.js
│   │   ├── features/
│   │   │   ├── rentals/
│   │   │   ├── skates/
│   │   │   └── storage/
│   │   │       └── StorageOverview.vue
│   │   ├── layouts/
│   │   │   ├── AppLayout.vue
│   │   │   └── AppNavbar.vue
│   │   ├── router/
│   │   │   └── index.js
│   │   ├── services/
│   │   │   ├── httpClient.js
│   │   │   └── storageApi.js
│   │   ├── views/
│   │   │   ├── DashboardView.vue
│   │   │   └── StorageView.vue
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── style.css
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── playwright.config.js
│   ├── vite.config.js
│   └── vitest.config.js
│
└── tests/
    ├── Backend.Tests/
    │   ├── Backend.Tests.csproj
    │   ├── IntegrationTests/
    │   └── UnitTests/
    │
    └── Frontend.Tests/
        ├── End2EndTests/
        ├── IntegrationTests/
        └── UnitTests/
            ├── components/
            ├── composables/
            └── services/
```

## 🧪 Tests

Zur automatisierten Qualitätssicherung werden folgende Testframeworks eingesetzt:

- **xUnit** – Backend-Tests
- **Vitest** – Frontend-Tests
- **Playwright** – End-to-End-Tests

### Backend-Tests ausführen

Im Hauptprojektverzeichnis:

```bash
dotnet test tests/Backend.Tests/Backend.Tests.csproj
```

### Frontend-Tests ausführen

```bash
cd frontend
npm test
```

### End-to-End-Tests ausführen

```bash
cd frontend
npx playwright install chromium
npm run test:e2e
```

Die Chromium-Installation ist nur bei der erstmaligen Einrichtung erforderlich.
Die Tests orientieren sich am Arrange-Act-Assert-Prinzip (AAA).


## 🚀 Installation


### Voraussetzungen

- .NET 10 SDK
- Node.js + npm
- Git


### Repository klonen

```bash

git clone https://github.com/alyna1411/Schlittschuhverleih.git

cd Schlittschuhverleih

```


### Backend starten

```bash

cd backend

dotnet run

```

### Frontend starten

```bash

cd frontend

npm install

npm run dev

```


### Frontend und Backend laufen unter:

```bash
Backend: http://localhost:5124
Frontend: http://localhost:5173
```


## 📸 Screenshots

TBA


## 🗺️ Zukünftige Erweiterungen

TBA


## 🎯 Projektziele

- Praxisorientierte Entwicklung mit C# und .NET
- Konzeption und Implementierung einer REST API
- Datenmodellierung mit Entity Framework Core
- Anwendung domänenorientierter Konzepte
- Frontend-Entwicklung mit Vue 3 und JavaScript
- Full-Stack-Integration
- Separation of Concerns
- Dependency Inversion
- Clean-Architecture-Prinzipien
- Automatisierte Qualitätssicherung


## 📋 Entwicklungsprozess

Die Entwicklung erfolgt agil nach Kanban in aufeinander aufbauenden, funktionsfähigen Inkrementen.


## 🚧 Projektstatus

Das Projekt befindet sich in der Entwicklung.
Diese Dokumentation wird kontinuierlich erweitert.



