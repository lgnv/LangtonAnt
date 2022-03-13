# Визуализация для Code Retreat: Муравей Лэнтона

## Входные данные

Для работы визуализатора необходимо загрузить Json-файл.

В Json-файле должен находится объект состоящий из:
- **типа поля `type`.**
    - **null | `square` квадратное**
    - **`hex` - гексагональное**
- Списка шагов `steps`. Каждый шаг представляет из себя два поля:
  - Цвет клетки(`state`), который получится после шага
    - `0 черный`
    - `1 красный`
  - **Направление движения(`direction`), куда должен идти муравей**
    - **`U ↑`**
    - **`D ↓`**
    - **`UL ↖`**
    - **`UR ↗`**
    - **`DL ↙`**
    - **`DR ↘`**

Пример находится в файле `test.json`:

```
{
    "type": "hex",                      // указываем `hex`, чтобы сменить визуализацию на гексоганальное поле
    "steps": [
      {
        "state": 1,
        "direction": "UR"
      },
      {
        "state": 1,
        "direction": "DR"
      },
      {
        "state": 1,
        "direction": "D"
      },
      {
        "state": 1,
        "direction": "DL"
      },
      {
        "state": 1,
        "direction": "UL"
      },
      {
        "state": 1,
        "direction": "U"
      },
      {
        "state": 0,
        "direction": "UL"
      },
      {
        "state": 1,
        "direction": "U"
      },
      {
        "state": 1,
        "direction": "UR"
      },
      {
        "state": 1,
        "direction": "DR"
      },
      {
        "state": 1,
        "direction": "D"
      },
      {
        "state": 0,
        "direction": "DR"
      },
      {
        "state": 0,
        "direction": "UR"
      }
    ]
}
```