steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL NOT NULL UNIQUE,
            first_name VARCHAR(250) NOT NULL,
            last_name VARCHAR(250) NOT NULL,
            date_of_birth DATE NOT NULL,
            email VARCHAR(250) NOT NULL,
            username VARCHAR(250) NOT NULL UNIQUE,
            password VARCHAR(250) NOT NULL

        );


        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE accessibilities (
            id SERIAL NOT NULL UNIQUE,
            name VARCHAR(250) NOT NULL

        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accessibilities;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE locations (
            id SERIAL NOT NULL UNIQUE,
            address VARCHAR(250) NOT NULL,
            city VARCHAR(250) NOT NULL,
            state VARCHAR(250) NOT NULL,
            location_name VARCHAR(250) NOT NULL,
            picture TEXT,
            updated_on DATE NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE locations;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE reviews (
            id SERIAL NOT NULL UNIQUE,
            location_id INTEGER NOT NULL REFERENCES locations("id") ON DELETE CASCADE,
            account_id INTEGER NOT NULL REFERENCES accounts("id") ON DELETE CASCADE, rating INTEGER NOT NULL check(rating = 1 or rating = 2 or rating = 3 or rating = 4 or rating = 5),
            body TEXT NOT NULL,
            created_on TIMESTAMP NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE reviews;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE comments (
            id SERIAL NOT NULL UNIQUE,
            account_id INTEGER NOT NULL REFERENCES accounts("id") ON DELETE CASCADE,
            review_id INTEGER NOT NULL REFERENCES reviews("id") ON DELETE CASCADE,
            content TEXT NOT NULL,
            created_on TIMESTAMP NOT NULL

        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE comments;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE location_accessibilities (
            location_id INTEGER NOT NULL REFERENCES locations("id") ON DELETE CASCADE,
            acessibility_id INTEGER NOT NULL REFERENCES accessibilities("id") ON DELETE CASCADE

        );

        """,
        # "Down" SQL statement
        """
        DROP TABLE location_accessibilities;
        """
    ],


]
