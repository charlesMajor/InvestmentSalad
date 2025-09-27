import axios, { AxiosError, AxiosResponse } from "axios";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_ADDRESS;
const testRoutePath = "/test";

export async function testRoute(): Promise<string> {
  try {
    const route: string = apiUrl + testRoutePath;
    const response: AxiosResponse<string> = await axios.get(route, {
      headers: {
        Accept: "application/json",
      },
    });

    // Access the response data if needed
    return response.data;
  } catch (error: any) {
    console.error("error:\n" + error);

    return "error:\n" + error;
  }
}
