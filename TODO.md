# Urban Dish

Listed below are some bugs that need fixing and some features that need implementation.

## Fixes

1. Add-Item button in admin menu crud does work, but the actual card only shows up after page reload.

2. In menu page, we search for dish and when we remove all the text from the search field. The removed dishes do not appears again. It just shows empty space, where the remaining items should be.

3. On account order page, the view details, and reorder buttons for each order have no functionality.

4. We should use types strictly from the prisma client. Dont create new types for every component.

5. Add-Item button form needs to have zod plus react-hook-form validation.

## Features

1. All static pages should be made at build time with the latest content from db at that time. (SSG)

2. Need to autofill fields in contact and delivery details form.
