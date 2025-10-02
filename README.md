# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Development

Use npm only:
npm install
npm run dev
Do not use Yarn. yarn.lock is ignored.

## Redux Root Reducer & Reset на Logout

У проєкті використовується глобальний rootReducer, який скидає весь Redux state при виході користувача.

## Як це працює

appReducer — це звичайний combineReducers, який об’єднує всі слайси (auth, recipes, users, notifications, тощо).

rootReducer — обгортка над appReducer, що перевіряє action.type.

Якщо спрацьовує logoutUser.fulfilled або logoutUser.rejected → Redux state обнуляється (state = undefined), і всі ред’юсери повертаються у свій initialState.

## Код (спрощено)

const appReducer = combineReducers({
auth: authReducer,
recipes: recipesReducer,
users: usersReducer,
notifications: notificationsReducer,
// інші слайси...
});

const rootReducer = (state, action) => {
if (
action.type === logoutUser.fulfilled.type ||
action.type === logoutUser.rejected.type
) {
state = undefined; // ❗ повний reset Redux state
}
return appReducer(state, action);
};

## Навіщо це потрібно?

Безпека: при logout гарантовано зносяться всі чутливі дані (user, token, кешовані дані).

Стабільність: новий користувач завжди бачить "чистий" стан додатку.

Простота: не треба вручну писати reset для кожного слайсу.
