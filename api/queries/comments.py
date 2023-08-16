from queries.reviews import ReviewOut
from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message:str


class CommentIn(BaseModel):
    account_id: int
    review_id: int
    content: str
    created_on: date

class CommentOut(BaseModel):
    id: int
    account_id: int
    content: str
    created_on: date
    review: ReviewOut


class CommentRepository:

    def get_all_review_comments(self, review_id:int) -> Union[List[CommentOut], Error]:

        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            c.id as comment_id
                            ,c.account_id as account_id_comment
                            ,c.content as content
                            ,c.created_on as created_on_comment

                            ,r.id as review_id
                            ,r.location_id as location_id
                            ,r.rating as rating
                            ,r.body as body
                            ,r.created_on as created_on_review

                            ,a.id as account_id
                            ,a.first_name as first_name
                            ,a.last_name as last_name
                            ,a.date_of_birth as date_of_birth
                            ,a.email as email
                            ,a.username as username
                            ,a.password as password
                        from comments c
                        join reviews r on c.review_id = r.id
                        join accounts a on r.account_id = a.id
                        where review_id =  %s
                        """,
                        [review_id]
                    )
                    comments = []
                    rows = db.fetchall()
                    for row in rows:
                        comment = self.comment_record_to_dict(row, db.description)
                        comments.append(comment)
                    return comments

        except Exception as e:
            print(e)
            return {"message":"Could not get all comments"}


    def comment_record_to_dict(self, row, description) -> CommentOut:

        comment = None
        if row is not None:
            comment = {}
            comment_fields = [
                "comment_id",
                "account_id_comment",
                "content",
                "created_on_comment"
            ]
            for i, column in enumerate(description):
                if column.name in comment_fields:
                    comment[column.name] = row[i]
            comment["id"] = comment["comment_id"]
            comment["account_id"] = comment["account_id_comment"]
            comment["created_on"] = comment["created_on_comment"]

            review = {}
            review_fields = [
                "review_id",
                "location_id",
                "rating",
                "body",
                "created_on_review"
            ]
            for i, column in enumerate(description):
                if column.name in review_fields:
                    review[column.name] = row[i]
            review["id"] = review["review_id"]

            review["created_on"] = review["created_on_review"]

            account={}
            account_fields = [
                "account_id",
                "first_name",
                "last_name",
                "date_of_birth",
                "email",
                "username",
                "password"
            ]
            for i, column in enumerate(description):
                if column.name in account_fields:
                    account[column.name] = row[i]
            account["id"] = account["account_id"]

            review["account_id"] = account

            comment["review"] = review



            return CommentOut(**comment)
