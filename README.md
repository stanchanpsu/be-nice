# Be Nice

Compliment Someone is a Google Home Action that will compliment you or anyone you want to compliment

## Deployment

Deploy to gcloud functions:

```sh
gcloud beta functions deploy complimentSomeone --stage-bucket staging.compliment-40255.appspot.com --trigger-http --entry-point complimentSomeone
```

## Usage

Talk to Google Assistant (on phone or Google Home):
> Hey Google, talk to be nice

> Hey Google, ask be nice to compliment me 

Compliment Someone:
> Compliment Angela

> Give Angela a compliment

Compliment Anyone:
> Compliment Me

> Give me a compliment