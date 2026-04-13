# Urban Dish

Listed below are some bugs that need fixing and some features that need implementation.

## Fixes

1. There is no way for user to access these pages:
   1. Auth pages.
   2. Account page on mobile.
   3. Admin page on mobile.

2. Upon updating user name in account page. It's does not change in the navbar automatically.

3. Order success page styles arent proper in production.

4. Reservation form is not submitable. Always says that a field is missing.

5. Add-Item button in admin menu crud does work, but the actual card only shows up after page reload.

6. Remove blog link from the footer.

7. In menu page, we search for dish and when we remove all the text from the search field. The removed dishes do not appears again.

## Features

1. Home page and About page featured menu items, chefs, and testimonials should be managable from admin.

2. Policy and Terms pages content should be manageable from admin.

3. All static pages should be made of build time. (SSG)

4. Delivery Charges should be manageble inside admin.

5. Forms should use react-hook-form + zod combination.

6. Autofill user on stripe checkout beforehand.

7. Autofill user info on reservation form.

8. Delete button in admin menu crud isnt working.

9. Image editor for image uploads.

10. Price formating should be according to the region.

11. On admin dashboard, larger amount of prices should shrink as K, M, B etc

12. Limit the amount of characters in a review.

13. On successfull order, generate a pdf receipt for the user to download.

14. User can download any order's pdf receipt inside account page.

15. Handle not-successful checkout

16. Some validation for cart inputs
