const RepoCard = props => {
  const {repositoryDetails} = props
  const {name, description, languages, stargazersCount, forksCount, owner} =
    repositoryDetails
  return (
    <Link to={`/repositories/${name}`}>
      <li></li>
    </Link>
  )
}

export default RepoCard
