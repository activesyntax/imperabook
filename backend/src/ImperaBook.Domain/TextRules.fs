namespace ImperaBook.Domain

module TextRules =
    type Checked =
        | Empty
        | TooLong
        | Valid of string

    let check (maxLength: int) (raw: string) : Checked =
        let s = if isNull raw then "" else raw.Trim()

        if s = "" then Empty
        elif s.Length > maxLength then TooLong
        else Valid s
