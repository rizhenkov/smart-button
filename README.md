# Smart Button for SmartThings

This small project is a SmartThings virtual button that allows you to control a SmartThings device by launching a defined SmartThings scene.

The typical use case is to give a ability to launch a selected scene in your SmartThings hub without giving access to your full SmartThings environment.
It may be useful for guests or for neighbors.

The button is protected by a PIN code that you can set.

## Deployment to Vercel
Press button below to deploy this project to Vercel in one click.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frizhenkov%2Fsmart-button&env=NUXT_SMART_THINGS_API_TOKEN,NUXT_SMART_THINGS_SCENE_ID,NUXT_PIN_CODE)

Next you will be asked to set the following environment variables:
- `NUXT_SMART_THINGS_API_TOKEN` - your SmartThings API token (https://account.smartthings.com/tokens/new)
- `NUXT_SMART_THINGS_SCENE_ID` - the ID of the SmartThings scene you want to launch (https://smart-button-psi.vercel.app/setup)
- `NUXT_PIN_CODE` - the PIN code to protect the button

## Advanced Usage
There are additional environment variables that you can set to customize the behavior of the button.

`NUXT_SMART_THINGS_API_URL`
Allows you to set the URL of the SmartThings API. By default, it is set to the SmartThings API URL (`https://api.smartthings.com/v1`). You can use it to set a different URL, for example, if you have a custom SmartHome API server.

`NUXT_ADDITIONAL_PUSH_PAUSE` allows you to set the pause after the scene is launched (until the button is ready to be pushed again). By default, it is set to 0 (no pause). You can set it to a value in milliseconds.