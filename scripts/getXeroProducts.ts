function getEnvVar(name: string, required = false) {
  const value = process.env[name]

  if (required && !value) {
    throw new Error(`Required environment variable ${name} is not set`)
  }

  return value
}

const main = async () => {
  console.log(`XERO_CLIENT_ID: ${getEnvVar('XERO_CLIENT_ID') ? '✅ Available' : '❌ Missing'}`)
  console.log(
    `XERO_CLIENT_SECRET: ${getEnvVar('XERO_CLIENT_SECRET') ? '✅ Available' : '❌ Missing'}`,
  )
}

main()
