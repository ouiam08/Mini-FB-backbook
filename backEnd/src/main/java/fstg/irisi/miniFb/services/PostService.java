package fstg.irisi.miniFb.services;

import fstg.irisi.miniFb.domain.command.PostCommand;
import fstg.irisi.miniFb.domain.command.UserCommand;
import fstg.irisi.miniFb.domain.mappers.PostMapper;
import fstg.irisi.miniFb.domain.mappers.UserMapper;
import fstg.irisi.miniFb.domain.model.FBUser;
import fstg.irisi.miniFb.domain.model.Post;
import fstg.irisi.miniFb.domain.repositories.FbUserRepository;
import fstg.irisi.miniFb.domain.repositories.PostRepository;
import fstg.irisi.miniFb.domain.representations.PostRepresentation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final UserMapper userMapper;
    private final FbUserRepository userRepository;

    public List<PostRepresentation> getAll() {
        return postMapper.convertToPostRepresentationList(postRepository.findAll(Sort.by(Sort.Order.desc("postTime"))));
    }

    public List<PostRepresentation> getPostByUserId(int id) {
        FBUser user =  userRepository.findById(id).orElseThrow(()->new IllegalArgumentException("user.not.found"+id));
        Sort sort = Sort.by(Sort.Order.desc("postTime"));
        return postMapper.convertToPostRepresentationList(postRepository.findAllByPostOwner(user,sort));

    }


    public int create(PostCommand postCommand) {
        byte[] photo = postCommand.getPhoto();
        String body = postCommand.getBody();
        UserCommand command = postCommand.getUser();
        Post post = new Post();
        post.setPostBody(body);
        post.setPostOwner(userMapper.convertToUser(command));
        post.setPostPhoto(photo);
        post.setPostTime(LocalDateTime.now());
        postRepository.save(post);
        return post.getPostId();

    }

    public PostRepresentation update(PostCommand postCommand) {
        Post post = postRepository.findById(postCommand.getId())
                .orElseThrow(() -> new IllegalArgumentException("post.not.found with id" + postCommand.getId()));
        post.setPostBody(postCommand.getBody());
        post.setPostOwner(userMapper.convertToUser(postCommand.getUser()));
        post.setPostPhoto(postCommand.getPhoto());
        postRepository.save(post);
        return postMapper.convertToPostRepresentation(post);
    }

    public String delete(int id) {
        if (id != 0) {
            postRepository.deleteById(id);
        }
        return "post deleted!";
    }


}
