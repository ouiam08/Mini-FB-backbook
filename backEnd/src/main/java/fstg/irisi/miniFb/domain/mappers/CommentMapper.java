package fstg.irisi.miniFb.domain.mappers;

import fstg.irisi.miniFb.domain.command.PostCommand;
import fstg.irisi.miniFb.domain.command.UserCommand;
import fstg.irisi.miniFb.domain.model.Comment;
import fstg.irisi.miniFb.domain.model.FBUser;
import fstg.irisi.miniFb.domain.model.Post;
import fstg.irisi.miniFb.domain.representations.CommentRepresentation;
import fstg.irisi.miniFb.domain.representations.PostRepresentation;
import fstg.irisi.miniFb.domain.representations.UserRepresentation;
import lombok.Builder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
@Builder
public class CommentMapper {
    private PostMapper postMapper;
    private UserMapper userMapper;
    public CommentRepresentation convertToCommentRepresentation(Comment comment) {
        return CommentRepresentation.builder()
                .id(comment.getCommentId())
                .body(comment.getCommentBody())
                .user(userMapper.convertToUserRepresentation(comment.getCommentOwner()))
                .post(postMapper.convertToPostRepresentation(comment.getCommentPost()))
                .build();
    }

    public List<CommentRepresentation> convertToCommentRepresentationList(List<Comment> commentList) {
        List<CommentRepresentation> representations = new ArrayList<>();

        for (Comment comment : commentList) {
            representations.add(
                    CommentRepresentation.builder()
                            .id(comment.getCommentId())
                            .body(comment.getCommentBody())
                            .user(userMapper.convertToUserRepresentation(comment.getCommentOwner()))
                            .post(postMapper.convertToPostRepresentation(comment.getCommentPost()))
                            .build()
            );
        }

        return representations;
    }







}
