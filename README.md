# read_app_version_action

Действие позволяет получить текущую версию проекта на основе заданной в файле переменной

## Применение

Автоматизация публикации релизов для тестирования ПО

## Поддерживаемые языки

* C/C++;

## Параметры

### Вход

| Параметр | Описание | Тип      | Обязательный |  Значение по умолчанию |
|----------|----------|----------|----------| ----------|
| exec_file   | Скрипт для выполнения   | Строка | Да | get_c_version.py |
| ver_file    | Файл с информацией о версии | Строка | Да | - |
| defined_version_var | Макрос, содержащий информацию о версии | Строка | Да | FIRMWARE_VERSION |


### Выход

| Параметр | Описание | Тип |
|----------|----------|----------|
| result_version    | Версия приложения | Строка   |

## Примеры использования

### Пример содержимого файла

Файл version_examples/version.h

#### Вариант 1
```
#ifndef FIRMWARE_VERSION
#define FIRMWARE_VERSION "0.0.1-b35"
#endif
```


#### Вариант 2
```
#define FIRMWARE_VERSION_MAJOR      (35)
#define FIRMWARE_VERSION_MINOR      (35)
#define FIRMWARE_VERSION_PATCH      (35)
#define FIRMWARE_VERSION_BETABUILD  (111)
```


### Получение версии

```
- name: Get app version
  id: version_step
  uses: aps-m/read_app_version_action@main
  with:
    ver_file: 'version_examples/version.h'
    defined_version_var: 'FIRMWARE_VERSION'

```

### Использование результата


```
- name: Echo version res 
  run: echo "${{ steps.version_step.outputs.result_version }}"
```
