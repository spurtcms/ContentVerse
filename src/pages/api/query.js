
export const GET_POSTS_LIST_QUERY = `query
  ChannelEntriesList(
$commonFilter: Filter
$sort: Sort
$entryFilter: EntriesFilter
$AdditionalData: EntriesAdditionalData
  ){
    ChannelEntriesList(commonFilter:$commonFilter,
      sort:$sort,
      entryFilter:$entryFilter,
      AdditionalData:$AdditionalData)
    {
      channelEntriesList{
        id
        title
        tenantId
        slug
        description
        userId
        channelId
        status
        isActive
        createdOn
        createdBy
        modifiedBy
        modifiedOn
        coverImage
        thumbnailImage
        metaTitle
        metaDescription
        keyword
        categoriesId
        relatedArticles
        featuredEntry
        viewCount
        author
        sortOrder
        createTime
        publishedTime
        readingTime
        tags
        excerpt
        imageAltTag
        categories{
          id
          categoryName
          categorySlug
          description
          createdOn
          createdBy
          modifiedOn
          parentId
          tenantId
        }
        additionalFields{
          sections{
            id
            sectionName
            sectionTypeId
            createdOn
            createdBy
            modifiedOn
            modifiedBY
            orderIndex
            tenantId
            __typename
          } 
          fields{
            id
            fieldName
            fieldTypeId
            mandatoryField
            optionExist
            createdOn
            createdBy
            modifiedOn
            modifiedBY
          } 
        }
        authorDetails{
          id
          firstName
          lastName
          email
          profileImagePath
          createdOn
          createdBy
          modifiedOn
          modifiedBy
        }
        
      }
    }
  }


`;

export const GET_POSTS_CATEGORYLIST_QUERY = `query($hierarchylevel: Int!){
    categoriesList(hierarchyLevel: $hierarchylevel){
      categories{
        id
        categoryName
        categorySlug
        parentId
      }
    }
  }
  `;


export const GET_POSTS_SLUG_QUERY = `query ChannelEntryDetail(
$id: Int
$slug: String
$AdditionalData: EntriesAdditionalData
  $channelId:Int
){
  ChannelEntryDetail(id:$id,slug:$slug,
    AdditionalData:$AdditionalData,channelId:$channelId){
    id
    title
    slug
    description
    userId
    channelId
    status
    isActive
    createdOn
    createdBy
    modifiedBy
    modifiedOn
    coverImage
    thumbnailImage
    metaTitle
    metaDescription
    keyword
    categoriesId
    relatedArticles
    featuredEntry
    viewCount
    author
    sortOrder
    createTime
    publishedTime
    readingTime
    tags
    excerpt
    imageAltTag
    categories{
        id
        categoryName
        categorySlug
        description
        imagePath
        createdOn
        createdBy
        modifiedOn
        modifiedBy
        parentId
        tenantId
      }
      additionalFields{
        sections{
          id
          sectionName
          sectionTypeId
          createdOn
          createdBy
          modifiedOn
          modifiedBY
          orderIndex
          tenantId
        }
        fields{
          id
          fieldName
          fieldTypeId
          mandatoryField
          optionExist
          createdOn
          createdBy
          modifiedOn
          modifiedBY
          fieldDesc
          orderIndex
          imagePath
          datetimeFormat
          timeFormat
          sectionParentId
          characterAllowed
          fieldTypeName
          fieldValue{
            id
            fieldValue
            createdOn
            createdBy
            modifiedOn
            modifiedBY
            tenantId
          }
          fieldOptions{
            id
            optionName
            optionValue
            createdOn
            createdOn
            createdBy
            modifiedOn
            modifiedBY
            tenantId
          }
          tenantId 
        }
      }
      authorDetails{
        id
        firstName
        lastName
        email
        mobileNo
        isActive
        profileImagePath
        createdOn
        createdBy
        modifiedOn
        modifiedBy
        tenantId
      }
      memberProfile{
        id
        memberId
        profileName
        profileSlug
        profilePage
        memberDetails
        companyName
        companyLocation
        companyLogo
        about
        seoTitle
        seoKeyword
        seoDescription
        linkedin
        twitter
        website
        createdBy
        createdOn
        modifiedOn
        modifiedBy
        claimStatus
        IsActive
        tenantId
        claimDate
      }
    tenantId
    contentChunk{
      data
      length
    }
  }
} `

export const GET_POSTS_CHANNELLIST_QUERY = `query
  CategoryList(
$categoryFilter: CategoryFilter
$commonFilter: Filter
  ){
    CategoryList(categoryFilter:$categoryFilter,
      commonFilter:$commonFilter){
        categorylist{
          id
          categoryName
          categorySlug
          description
          tenantId
        }
      }
    
  }`

export const GET_AUTHOR_LIST_QUERY = `query
TopAuthorsList($id: Int){
  TopAuthorsList(id:$id){
    id
    profileImagePath
    firstName
    lastName
    mobileNo
    email
    
  
  }
}`

export const GET_POSTS_CHANNELLIST_SLUG_QUERY = `
  query channelDetail($id: Int,$slug: String,$active: Boolean){
  ChannelDetail(channelId: $id,channelSlug: $slug,isActive: $active){
    id
    channelName
    channelDescription
    slugName
    fieldGroupId
    isActive
    createdOn
    createdBy
    isDeleted
    modifiedOn
    modifiedBy
    tenantId
  }
}`


export const GET_POSTS_QUERY_CATEGORY = `query($hierarchylevel: Int!){
    categoriesList(hierarchyLevel: $hierarchylevel){
      categories{
        id
        categoryName
        categorySlug
        parentId
      }
    }
  }
  `;

  export const GET_HEADER_LOGO_QUERY = `query
  GeneralInformation($tenantId:Int){
      GeneralInformation(tenantId:$tenantId){
          companyName
          expandLogoPath
          logoPath
          tenantId
      }
  }
`;
export const GET_SIGNIN_QUERY = `mutation
  memberCheckLogin($input: MemberSignin!){
    memberCheckLogin(input:$input){
      email
      password
      message
      token
      success
    }
  }
`;
export const GET_REGISTER_QUERY = `mutation
  memberRegister(
$input: MemberDetails!
$arguments: MemberArguments
  ){
    memberRegister(input:$input,
    arguments:$arguments)
  }`;
  export const GET_HEADER_FORGOT_PASSWORD_QUERY = `mutation 
  forgotPassword($input: MemberInfo!){
    forgotPassword(input:$input){
      message
    }
  }`;
  export const GET_RESET_NEW_PASSWORD =`mutation 
resetPassword($input: MemberResetpassInfo!){
  resetPassword(input:$input)
}
`
export const GET_MEMBERSHIP_PLAN=`query
MembershipLevelList(
$filter: Filter
$tenantId: Int
  ){
    MembershipLevelList(filter:$filter,
    tenantId:$tenantId){
      MemnershipDtails{
        SubscriptionName
        Description
        MembergroupLevelId
        InitialPayment
        RecurrentSubscription
        BillingAmount
        BillingfrequentValue
        BillingfrequentType
        CustomTrial
        TrialBillingAmount
        TrialBillingLimit 
        Id
        TenantId
      }
    }
  }`
  export const POST_MEMBERSHIP_CHECKOUT_PLAN=`mutation
  MemberCheckoutDetails
  ($checkouts: MemberCheckoutDetails!)
  {
    MemberCheckoutDetails(
      checkouts:$checkouts
    )
  }`

  export const GET_MEMBERSHIP_DETAIL_PAGE=`query
  MembershipLevelDetails(
$subscriptionid: Int
$tenantId: Int
  ){
    MembershipLevelDetails(subscriptionid:$subscriptionid,
    tenantId:$tenantId){
      MemnershipDtails{
        SubscriptionName
        Description
        MembergroupLevelId
        InitialPayment
        RecurrentSubscription
        BillingAmount
        BillingfrequentValue
        BillingfrequentType
        CustomTrial
        TrialBillingAmount
        TrialBillingLimit 
        
      }
    }
  }
`