# Визуализация для Code Retreat: Муравей Лэнтона

## Входные данные

Для работы визуализатора необходимо загрузить Json-файл.

Формат данных в файле следующий:

```
object {
    type: string <Type>,
    steps: array of object <Step[]>
}
```

```
Type {
    "square",
    "hex"
}
```

```
Direction {
    "U",        // ↑
    "R",        // →
    "D",        // ↓	
    "L",        // ←

    "UL",       // ↖
    "UR",       // ↗
    "DR",       // ↘
    "DL"        // ↙
}