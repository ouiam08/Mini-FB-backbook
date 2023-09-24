package fstg.irisi.miniFb.domain.mappers;

import fstg.irisi.miniFb.domain.command.PostCommand;
import fstg.irisi.miniFb.domain.command.UserCommand;
import fstg.irisi.miniFb.domain.model.FBUser;
import fstg.irisi.miniFb.domain.model.Post;
import fstg.irisi.miniFb.domain.representations.PostRepresentation;
import fstg.irisi.miniFb.domain.representations.UserRepresentation;
import lombok.Builder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
@Builder
public class PostMapper {
    private UserMapper userMapper;

    public PostRepresentation convertToPostRepresentation(Post post) {
        return PostRepresentation.builder()
                .id(post.getPostId())
                .photo(post.getPostPhoto())
                .body(post.getPostBody())
                .user(userMapper.convertToUserRepresentation(post.getPostOwner()))
                .build();
    }

    public List<PostRepresentation> convertToPostRepresentationList(List<Post> postList) {
        List<PostRepresentation> representations = new ArrayList<>();

        for (Post post : postList) {
            representations.add(
                    PostRepresentation.builder()
                            .id(post.getPostId())
                            .photo(post.getPostPhoto())
                            .body(post.getPostBody())
                            .user(userMapper.convertToUserRepresentation(post.getPostOwner()))
                            .build()
            );
        }

        return representations;
    }

    public Post convertToPost(PostCommand post) {
        FBUser postOwner = post.getUser() != null ? userMapper.convertToUser(post.getUser()) : null;

        return Post.builder()
                .postId(post.getId())
                .postPhoto(post.getPhoto())
                .postBody(post.getBody())
                .postOwner(postOwner)
                .build();
    }

}
