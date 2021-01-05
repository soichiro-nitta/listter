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
    friends_count: 365
    geo_enabled: false
    has_extended_profile: true
    id: 822446060211535900
    id_str: number
    is_translation_enabled: boolean
    is_translator: boolean
    lang: null
    listed_count: 6
    location: '料理  │ おでかけ │ 食べること '
    name: 'ねぽプー'
    notifications: false
    profile_background_color: 'F5F8FA'
    profile_background_image_url: null
    profile_background_image_url_https: null
    profile_background_tile: false
    profile_banner_url: 'https://pbs.twimg.com/profile_banners/822446060211535872/1588663635'
    profile_image_url: 'http://pbs.twimg.com/profile_images/1345282560830578688/MbzUktTR_normal.jpg'
    profile_image_url_https: 'https://pbs.twimg.com/profile_images/1345282560830578688/MbzUktTR_normal.jpg'
    profile_link_color: '1DA1F2'
    profile_sidebar_border_color: 'C0DEED'
    profile_sidebar_fill_color: 'DDEEF6'
    profile_text_color: '333333'
    profile_use_background_image: true
    protected: false
    screen_name: '_nenenemo'
    statuses_count: 16082
    time_zone: null
    translator_type: 'none'
    url: 'https://t.co/gYrlKXvLe3'
    utc_offset: null
    verified: false
  }
}[]
