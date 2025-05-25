function getEnvVar(name: string, required = false) {
  const value = process.env[name]

  if (required && !value) {
    throw new Error(`Required environment variable ${name} is not set`)
  }

  return value
}

const main = async () => {
  console.log(`GITHUB_TOKEN: ${getEnvVar('GITHUB_TOKEN') ? '✅ Available' : '❌ Missing'}`)
}

main()
