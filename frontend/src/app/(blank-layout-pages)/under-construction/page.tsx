// Component Imports
import UnderConstruction from '@views/pages/misc/UnderConstruction'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const UnderConstructionPage = () => {
  // Vars
  const mode = getServerMode()

  return <UnderConstruction mode={mode} />
}

export default UnderConstructionPage
