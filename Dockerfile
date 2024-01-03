# Use an official Node.js base image with a specific version
FROM node:20.10

WORKDIR /
RUN git clone https://github.com/MichaelB7/pgn-extract
WORKDIR /pgn-extract/src
RUN make
RUN chmod +x pgn-extract
RUN cp pgn-extract /bin

# Set the working directory inside the container
WORKDIR /usr/share/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install


# Copy the rest of the application code to the working directory
COPY . .

# Expose any ports your bot may use (e.g., Discord uses 80 by default)
EXPOSE 80

# Command to run your application (replace with the actual file and command)
CMD ["/bin/bash", ""]

