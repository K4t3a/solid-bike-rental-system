# Описание системы аренды велосипедов и применение принципов SOLID

## Описание системы

Система включает следующие компоненты:

- **Велосипеды (`Bike`)**: Базовый класс для велосипедов с дочерними классами для разных типов:
  - `CityBike`
  - `ElectricBike`
- **Сервис аренды (`BikeRentalService`)**: Управляет процессом бронирования.
- **Поиск велосипедов (`BikeSearchService`)**: Отвечает за поиск велосипедов по ID.
- **Информация о велосипедах (`BikeInfoService`)**: Предоставляет данные о велосипедах.
- **Печать заказов (`PrinterService`)**: Управляет печатью заказов.
- **Уведомления (`NotificationService`)**: Отправляет уведомления:
  - Email
  - SMS
- **Интерфейсы**: Абстрактные классы для:
  - Уведомлений
  - Поиска
  - Печати

## Применение принципов SOLID

### Single Responsibility Principle (SRP)

Каждый класс отвечает за одну задачу:

- `BikeRentalService` управляет бронированием.
- `BikeSearchService` ищет велосипеды.
- `BikeInfoService` предоставляет информацию о велосипедах.
- `PrinterService` печатает заказы.
- `EmailNotification` и `SMSNotification` отправляют уведомления.

### Open/Closed Principle (OCP)

- Система открыта для расширения (новые типы велосипедов или способы уведомлений добавляются без изменения кода) и закрыта для модификации.
- Новые типы велосипедов создаются через наследование от `Bike`.
- Новые способы уведомлений реализуют интерфейс `AbstractNotification`.

### Liskov Substitution Principle (LSP)

- Дочерние классы (`CityBike`, `ElectricBike`) могут заменять базовый класс `Bike` без нарушения поведения.
- Классы уведомлений (`EmailNotification`, `SMSNotification`) взаимозаменяемы через интерфейс `AbstractNotification`.

### Interface Segregation Principle (ISP)

Интерфейсы разделены на минимальные:

- `AbstractNotification` содержит только метод `send`.
- `AbstractPrinter` содержит метод `printOrder`.
- `AbstractBikeSearcher` содержит метод `findBike`.

Клиенты не вынуждены реализовывать ненужные методы.

### Dependency Inversion Principle (DIP)

- Высокоуровневый модуль `BikeRentalService` зависит от абстракций (`AbstractNotification`, `AbstractPrinter`, `AbstractBikeSearcher`), а не от конкретных реализаций.
- Конкретные сервисы внедряются через конструктор.

*Обновлено: 22.04.2025*
