// Абстрактный класс для уведомлений (интерфейс)
class AbstractNotification {
    send(message) {
        throw new Error("Method 'send()' must be implemented.");
    }
}

// Реализация уведомлений по email
class EmailNotification extends AbstractNotification {
    send(message) {
        return `Email sent: ${message}`;
    }
}

// Реализация уведомлений по SMS
class SMSNotification extends AbstractNotification {
    send(message) {
        return `SMS sent: ${message}`;
    }
}

// Абстрактный класс для печати
class AbstractPrinter {
    printOrder(order) {
        throw new Error("Method 'printOrder()' must be implemented.");
    }
}

// Реализация печати
class PrinterService extends AbstractPrinter {
    printOrder(order) {
        return `Printing order: ${order}`;
    }
}

// Абстрактный класс для поиска велосипедов
class AbstractBikeSearcher {
    findBike(id) {
        throw new Error("Method 'findBike()' must be implemented.");
    }
}

// Сервис поиска велосипедов
class BikeSearchService extends AbstractBikeSearcher {
    #bikes; // Приватное хранилище
    constructor() {
        this.#bikes = new Map();
    }

    addBike(bike) {
        this.#bikes.set(bike.id, bike);
    }

    findBike(id) {
        return this.#bikes.get(id) || null;
    }
}

// Абстрактный класс для получения информации о велосипедах
class AbstractBikeInfo {
    getInfo(bike) {
        throw new Error("Method 'getInfo()' must be implemented.");
    }
}

// Сервис информации о велосипедах
class BikeInfoService extends AbstractBikeInfo {
    getInfo(bike) {
        return bike.getDetails();
    }
}

// Базовый класс велосипеда
class Bike {
    #id; // Приватное поле для инкапсуляции
    constructor(name, pricePerHour) {
        this.#id = Math.random().toString(36).substr(2, 9); // Уникальный ID
        this._name = name; // Защищенное поле
        this._pricePerHour = pricePerHour;
    }

    get id() {
        return this.#id;
    }

    getDetails() {
        return `${this._name}: $${this._pricePerHour}/hour`;
    }
}

// Городской велосипед (наследование)
class CityBike extends Bike {
    constructor(name, pricePerHour, gearCount) {
        super(name, pricePerHour);
        this._gearCount = gearCount;
    }

    getDetails() {
        return `${super.getDetails()}, Gears: ${this._gearCount}`;
    }
}

// Электрический велосипед (наследование)
class ElectricBike extends Bike {
    constructor(name, pricePerHour, batteryLife) {
        super(name, pricePerHour);
        this._batteryLife = batteryLife;
    }

    getDetails() {
        return `${super.getDetails()}, Battery: ${this._batteryLife} hours`;
    }
}

// Сервис аренды велосипедов (высокоуровневый модуль)
class BikeRentalService {
    #searcher; // Зависимость от абстракции
    #printer; // Зависимость от абстракции
    #notifier; // Зависимость от абстракции
    #infoService; // Зависимость от абстракции
    constructor(searcher, printer, notifier, infoService) {
        this.#searcher = searcher;
        this.#printer = printer;
        this.#notifier = notifier;
        this.#infoService = infoService;
    }

    rentBike(bikeId, hours) {
        const bike = this.#searcher.findBike(bikeId);
        if (!bike) {
            return this.#notifier.send(`Bike with ID ${bikeId} not found`);
        }

        const order = `Rental: ${this.#infoService.getInfo(bike)} for ${hours} hours`;
        this.#printer.printOrder(order);
        return this.#notifier.send(`Bike rented: ${order}`);
    }
}

// Пример использования
const searcher = new BikeSearchService();
const printer = new PrinterService();
const emailNotifier = new EmailNotification();
const infoService = new BikeInfoService();

const rentalService = new BikeRentalService(searcher, printer, emailNotifier, infoService);

const cityBike = new CityBike("CityRider", 5, 6);
const electricBike = new ElectricBike("ElectroVolt", 15, 8);

searcher.addBike(cityBike);
searcher.addBike(electricBike);

console.log(rentalService.rentBike(cityBike.id, 2));
console.log(rentalService.rentBike(electricBike.id, 3));
console.log(rentalService.rentBike("nonexistent", 1));

// Тестирование с другим уведомлением (SMS)
const smsNotifier = new SMSNotification();
const rentalServiceWithSMS = new BikeRentalService(searcher, printer, smsNotifier, infoService);
console.log(rentalServiceWithSMS.rentBike(cityBike.id, 4));
