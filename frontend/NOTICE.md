# Third-Party Notices

ImperaBook is proprietary software. Copyright © 2026 ActiveSyntax. All rights reserved.

The distributed container image bundles the third-party open source components listed below.
Each remains the property of its respective copyright holders and is used under the terms of its
own licence. Nothing in this file grants any right to ImperaBook itself; see `EULA.md` for that.

The full text of each licence referenced here is reproduced in the _Licence texts_ section at the
end of this document.

---

## Fonts

### JetBrains Mono

Copyright 2020 The JetBrains Mono Project Authors (<https://github.com/JetBrains/JetBrainsMono>)

Licensed under the SIL Open Font License, Version 1.1.

---

## Backend — .NET

### .NET Runtime, ASP.NET Core, ASP.NET Core Identity, Entity Framework Core

Copyright (c) .NET Foundation and Contributors

Licensed under the MIT License.

### Npgsql, Npgsql.EntityFrameworkCore.PostgreSQL

Copyright (c) Npgsql

Licensed under the PostgreSQL License.

### CSharpFunctionalExtensions

Copyright (c) Vladimir Khorikov

Licensed under the MIT License.

---

## Frontend — Angular

### Angular

Copyright (c) Google LLC

Licensed under the MIT License.

### RxJS

Copyright (c) Ben Lesh, Google, Inc., Netflix, Inc., Microsoft Corp. and contributors

Licensed under the Apache License, Version 2.0.

### tslib

Copyright (c) Microsoft Corporation

Licensed under the BSD Zero Clause License (0BSD).

---

## Not bundled

The following are used by ImperaBook but are **not** redistributed inside the ImperaBook container
image, and so are not covered by this notice:

- **PostgreSQL** — pulled as a separate official container image by `docker compose`, under the
  PostgreSQL License.

---

## Licence texts

### MIT License

```
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

### PostgreSQL License

```
Permission to use, copy, modify, and distribute this software and its documentation for any
purpose, without fee, and without a written agreement is hereby granted, provided that the above
copyright notice and this paragraph and the following two paragraphs appear in all copies.

IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE TO ANY PARTY FOR DIRECT, INDIRECT, SPECIAL,
INCIDENTAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS, ARISING OUT OF THE USE OF THIS
SOFTWARE AND ITS DOCUMENTATION, EVEN IF THE COPYRIGHT HOLDER HAS BEEN ADVISED OF THE POSSIBILITY
OF SUCH DAMAGE.

THE COPYRIGHT HOLDER SPECIFICALLY DISCLAIMS ANY WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE SOFTWARE PROVIDED
HEREUNDER IS ON AN "AS IS" BASIS, AND THE COPYRIGHT HOLDER HAS NO OBLIGATIONS TO PROVIDE
MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS, OR MODIFICATIONS.
```

### BSD Zero Clause License (0BSD)

```
Permission to use, copy, modify, and/or distribute this software for any purpose with or without
fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS
SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE
AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT,
NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE
OF THIS SOFTWARE.
```

### SIL Open Font License, Version 1.1

> The full text is not reproduced here. Paste the verbatim `OFL.txt` shipped with the JetBrains
> Mono release in use — the licence requires the complete text to travel with the font.

### Apache License, Version 2.0

> The full text is not reproduced here. Paste the verbatim `LICENSE` from the Apache Software
> Foundation, and append any `NOTICE` file shipped by an Apache-licensed dependency — section 4(d)
> requires those notices to be propagated.
