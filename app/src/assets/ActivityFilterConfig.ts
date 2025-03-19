const Filters = {
  NotificationOptions: [
    { id: '1', title: 'Filters.CredentialOfferReceived' },
    { id: '2', title: 'Filters.InfoRequest' },
    { id: '3', title: 'Filters.Update' },
    { id: '4', title: 'Filters.CredentialRevoked' },
  ],
  History: {
    CredentialOfferOptions: [
      { id: '1', title: 'History.Operations.Accepted' },
      { id: '2', title: 'History.Operations.Declined' },
      { id: '3', title: 'History.Operations.Revoked' },
      { id: '4', title: 'History.Operations.Removed' },
    ],
    HistoryOptions: [
      { id: '1', title: 'Filters.ProofRequestAccepted' },
      { id: '2', title: 'Filters.ProofRequestDeclined' },
      { id: '3', title: 'Filters.AddContact' },
      { id: '4', title: 'Filters.RemoveContact' },
      { id: '5', title: 'Filters.AppParamsChanged' },
    ],
  },
  SortOptions: [
    { id: '1', title: 'Filters.NewestFirst' },
    { id: '2', title: 'Filters.OldestFirst' },
    { id: '3', title: 'Filters.ContactAToZ' },
    { id: '4', title: 'Filters.ContactZToA' },
  ],
}

export default Filters
