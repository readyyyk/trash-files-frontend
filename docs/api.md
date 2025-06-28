## 📁 Express File API

### 📌 Описание

Простой API на Express с двумя маршрутами:

* POST /send — принимает файл в формате multipart/form-data, сохраняет его с уникальным именем в ./store, возвращает имя файла.
* GET /get/:filename — отдаёт сохранённый файл по имени.

---

## 📤 POST /send

* Тип запроса: multipart/form-data
* Поле: file

Пример запроса (cURL):

curl -F "file=@example.jpg" http://localhost:3000/send
Ответ:

{ "filename": "a3f2c...6f7d.jpg" }
---

## 📥 GET /get/:filename

* Описание: Получение ранее загруженного файла по имени.
* Пример:

curl http://localhost:3000/get/a3f2c...6f7d.jpg --output saved.jpg
Ошибки:

* 404 Not Found — если файл не существует
