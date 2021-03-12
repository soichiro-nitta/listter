export type Collection = {
  collection_type: string
  collection_url: string
  custom_timeline_type: string
  custom_timeline_url: string
  name: string
  name_entities: {}
  timeline_order: string
  user_id: string
  visibility: string
}[]

export type List = {
  created_at: string
  description: string
  following: boolean
  full_name: string
  id: number
  id_str: string
  member_count: number
  mode: string
  name: string
  slug: string
  subscriber_count: number
  uri: string
  user: {}
}

export type Timeline = {
  created_at: string
  entities: {
    hashtags: []
    symbols: []
    urls: []
    user_mentions: {
      id: number
      id_str: string
      indices: []
      name: string
      screen_name: string
    }[]
  }
  id: number
  id_str: string
  lang: string
  retweet_count: number
  retweeted: boolean
  text: string
  user: {
    contributors_enabled: boolean
    created_at: string
    default_profile: boolean
    default_profile_image: boolean
    description: string
    entities: { description: {}; url: {} }
    favourites_count: number
    follow_request_sent: boolean
    followers_count: number
    following: boolean
    friends_count: number
    geo_enabled: boolean
    has_extended_profile: boolean
    id: number
    id_str: number
    is_translation_enabled: boolean
    is_translator: boolean
    lang: null
    listed_count: number
    location: string
    name: string
    notifications: false
    profile_background_color: string
    profile_background_image_url: any
    profile_background_image_url_https: any
    profile_background_tile: boolean
    profile_banner_url: string
    profile_image_url: string
    profile_image_url_https: string
    profile_link_color: string
    profile_sidebar_border_color: string
    profile_sidebar_fill_color: string
    profile_text_color: string
    profile_use_background_image: boolean
    protected: boolean
    screen_name: string
    statuses_count: number
    time_zone: any
    translator_type: string
    url: string
    utc_offset: any
    verified: boolean
  }
}[]
