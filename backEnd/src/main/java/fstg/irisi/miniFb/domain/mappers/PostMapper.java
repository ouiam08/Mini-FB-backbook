package fstg.irisi.miniFb.domain.mappers;

import fstg.irisi.miniFb.domain.command.PostCommand;
import fstg.irisi.miniFb.domain.command.UserCommand;
import fstg.irisi.miniFb.domain.model.FBUser;
import fstg.irisi.miniFb.domain.model.Post;
import fstg.irisi.miniFb.domain.repositories.CommentRepository;
import fstg.irisi.miniFb.domain.representations.PostRepresentation;
import fstg.irisi.miniFb.domain.representations.UserRepresentation;
import lombok.Builder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;


@Component
@Builder
public class PostMapper {
    private UserMapper userMapper;
    private CommentRepository commentRepository;
    public PostRepresentation convertToPostRepresentation(Post post) {


        return PostRepresentation.builder()
                .id(post.getPostId())
                .photo(post.getPostPhoto())
                .body(post.getPostBody())
                .time(timeTraitement(post))
                .user(userMapper.convertToUserRepresentation(post.getPostOwner()))
                .build();

    }

    public List<PostRepresentation> convertToPostRepresentationList(List<Post> postList) {
        List<PostRepresentation> representations = new ArrayList<>();

        for (Post post : postList) {
            int nbreComment = commentRepository.findByPostId(post.getPostId()).size();

            representations.add(
                    PostRepresentation.builder()
                            .id(post.getPostId())
                            .photo(post.getPostPhoto())
                            .body(post.getPostBody())
                            .time(timeTraitement(post))
                            .user(userMapper.convertToUserRepresentation(post.getPostOwner()))
                            .nbreComment(nbreComment)
                            .build()
            );
        }

        return representations;
    }

    public String timeTraitement(Post post) {
        if (post.getPostTime() == null) {
            return "Time not available"; 
        }

        LocalDateTime postTime = post.getPostTime();
        LocalDateTime currentTime = LocalDateTime.now();
        Duration duration = Duration.between(postTime, currentTime);
        Period period = Period.between(postTime.toLocalDate(), currentTime.toLocalDate());

        String timeAgo;

        if (duration.toMinutes() < 1) {
            timeAgo = "Il y a moins d'une minute";
        } else if (duration.toHours() < 1) {
            long minutes = duration.toMinutes();
            timeAgo = "Il y a " + minutes + " minute" + (minutes > 1 ? "s" : "");
        } else if (duration.toDays() < 1) {
            long hours = duration.toHours();
            timeAgo = "Il y a " + hours + " heure" + (hours > 1 ? "s" : "");
        } else if (period.getMonths() < 1) {
            long days = duration.toDays();
            timeAgo = "Il y a " + days + " jour" + (days > 1 ? "s" : "");
        } else if (period.getYears() < 1) {
            long months = period.getMonths();
            timeAgo = "Il y a " + months + " mois";
        } else {
            long years = period.getYears();
            timeAgo = "Il y a " + years + " an" + (years > 1 ? "s" : "");
        }

        return timeAgo;
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
