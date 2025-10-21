# Проектная работа Stellar-Burgers

---

## This project was completed as part of the training program "React developer" in Yandex Practicum.

[Project link](https://stellar-burger.igniz.ru/)

### The project used technologies such as: React, ReduxToolkit, ReactDND, React-Router-Dom, WebsocketAPI, Jest, Cypress.

---

To run project in dev mode use:

```bash
yarn
```

```bash
yarn dev
```

---

Деплой был осуществлен на собственный VPS сервер по следующим шагам:

1. Написание Dockerfile
2. Установка на сервер git, nginx, docker
3. Клонирование репозитория
4. Сборка и запуск docker контейнера с внешним портом 3000
5. Настройка nginx конфига (обратный прокси с порта 80 на 3000)
6. Получение и деплой ssl сертификата с помощью certbot
