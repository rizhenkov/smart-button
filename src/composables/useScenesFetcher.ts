export interface SmartScene {
    sceneId: string;
    sceneName: string;
    sceneIcon: string;
    sceneColor: null;
    locationId: string;
    createdBy: string;
    createdDate: number;
    lastUpdatedDate: number;
    lastExecutedDate: null;
    editable: boolean;
    apiVersion: string;
}

export default function useScenesFetcher () {
  const fetchScenes = async (apiKey: string) => {
    return await $fetch('https://api.smartthings.com/v1/scenes', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }) as {
        items: SmartScene[]
    }
  }

  return {
    fetchScenes
  }
}
