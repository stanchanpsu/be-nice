with open('compliments-raw.txt', 'r') as compliments:
    with open('compliments-formatted.txt', 'w') as compliments_formatted:
        for line in compliments:
            compliments_formatted.write('\"' + line.replace('"', '\'').rstrip('\n\r') + '\",\n')