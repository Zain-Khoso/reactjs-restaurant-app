# Urban Dish

Listed below are some bugs that need fixing and some features that need implementation.

## Fixes

1. Upon updating user name in account page. It's does not change in the navbar automatically. (we should have a zustand store for use data. So when it is updated at one place. it updates everywhere else too)

2. Order success page styles arent correct. The button and text appear side by side. Cramped together.

3. Add-Item button in admin menu crud does work, but the actual card only shows up after page reload.

4. Remove blog link from the footer.

5. In menu page, we search for dish and when we remove all the text from the search field. The removed dishes do not appears again. It just shows empty space, where the remaining items should be.

## Features

1. Home page and About page featured menu items, chefs, and testimonials should be managable from admin.

2. Policy and Terms pages content should be manageable from admin.

3. All static pages should be made at build time with the latest content from db at that time. (SSG)

4. Delivery Charges should be manageble inside admin.

5. All forms should use react-hook-form + zod combination.

6. Autofill user info on stripe checkout beforehand.

7. Autofill user info on reservation form.

8. Image editor for all image uploads.

9. All price formating should be according to the region in the frontend.

10. On admin dashboard, larger amounts of should shrink and add suffix eg: K, M, B

11. Limit the amount of characters in for every input field.

12. On successfull order, generate a pdf receipt for the user to download.

13. User can download any order's pdf receipt inside account page.

14. Handle not-successful checkout.

15. Upon reservation confirmation, that reservation should be assigned a table number. And one table will only belong to one reservation on that day and time.

16. We should have ingrediants for each dish.
