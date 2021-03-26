
export interface Result {
  no_correct_wear_mask: number
  no_incorrect_wear_mask: number
  no_not_wear_mask: number
  percentage: number
  total: number
}

export interface MaskType {
  red: number
  green: number
  yellow: number
}

export interface Collection {
  [key: string]: {
    gpu_process_time_gmt: number
    gpu_server: string
    record_end_date_gmt: number
    record_start_date_gmt: number
    result: Result
  }
}

export interface Collections {
  [key: string]: {
    date: string
    gpu_process_time_gmt: number
    gpu_server: string
    record_end_date_gmt: number
    record_start_date_gmt: number
    result: {
      no_correct_wear_mask: number
      no_incorrect_wear_mask: number
      no_not_wear_mask: number
      percentage: number
      total: number
    }
    time: string
    timeRange: string
  }
}

export interface Cameras {
  [key: string]: {
    district: string
    latitude: number
    location: string
    longitude: number
    note: string
    path: string
    province: string
    sub_district: string
  }
}

export interface Observes {
  [key: string]: {
    collection: Collections
  }
}

export interface Observation {
  province_name: string
  district_name: string
  subdistrict_name: string
  camera_latitude: string
  camera_longtitude: string
  camera_name: string
  selected?: boolean
  collection: Collection
}


export interface MarkerProperty {
  date: string
  gpu_server: string
  latitude: number
  longitude: number
  name: string
  date__1: number
  no_correct_wear_mask: number
  no_incorrect_wear_mask: number
  no_not_wear_mask: number
  percentage: number
  time_end: string
  time_start: string
  total: number
}

export interface MarkerProps {
  lat: number
  lng: number
  data: CameraDetail
  action?: any
  actionCenter?: any
  pop?: string
  status: boolean
  actionStatus?: any
}

export interface BasicMarkerProps {
  lat: number
  lng: number
  percentage: number
}

// interface Result {
//   total: number
//   no_correct_wear_mask: number
//   no_incorrect_wear_mask: number
//   no_not_wear_mask: number
//   percentage: number
// }

// export interface Collection {
//   [key: string]: {
//     detect_timestamp: string
//     time_start: string
//     time_end: string
//     result: Result
//   }[]
// }

// interface Observer {
//   name: string
//   gpu_server: string
//   latitude: number
//   longitude: number
//   collection: Collection
// }

// export interface Observation {
//   [key: string]: Observer
// }

export interface CameraDetail {
  name: string
  latitude: number
  longitude: number
  collection_date: string
  detect_timestamp: string
  result: Result
  province_name: string
  district_name: string
  subdistrict_name: string
  time: string
  timeRange: string
  date: string
}
