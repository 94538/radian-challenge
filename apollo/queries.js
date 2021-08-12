import {gql} from "@apollo/client";

//get all launches list
export const GET_LAUNCH_LIST = gql`
query GetLaunches {
    launchesPast(limit: 20) {
      id
      details
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        video_link
        mission_patch_small
      }
      rocket {
        rocket_name
      }
    }
  }
`
// get individual launch detail
export const GET_LAUNCH_DETAIL = gql`
query GetLaunchDetail($id: ID!) {
  launch(id: $id) {
      id
      details
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        video_link
        mission_patch
      }
      rocket {
        rocket_name
      }
    }
  }
`