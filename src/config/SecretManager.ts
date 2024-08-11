import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secretsManagerClient = new SecretsManagerClient({
  region: process.env.AWS_REGION || "ap-south-1",
});

export const getSecretValue = async (
  secretName: string
): Promise<string | undefined> => {
  try {
    const command = new GetSecretValueCommand({
      SecretId: secretName,
    });
    const data = await secretsManagerClient.send(command);

    if (data.SecretString) {
      return data.SecretString;
    }
    return undefined;
  } catch (err) {
    console.error(`Error retrieving secret "${secretName}":`, err);
    throw err;
  }
};
