# Как запустить
1. Создать .env по примеру `.env.example`
2. ```bash 
    npm i
    ```
3. ```bash
    npx prisma generate
    ```
4. ```bash
    npx prisma db pull
    ```
5. ```bash
    npm start
    ```

# Endpoints 

| Метод | Endpoint             | Описание                     | Тело запроса                              |
|-------|----------------------|------------------------------|-------------------------------------------|
| POST  | `/api/bookings/reserve` | Забронировать место на мероприятие | `{`<br>`  "event_id": 1,`<br>`  "user_id": "user123"`<br>`}` |

