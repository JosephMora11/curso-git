const url = "https://jsonplaceholder.typicode.com";

const getUser = async (id) => {
  const res = await fetch(`${url}/users?id=${id}`);
  const user = (await res.json())[0];

  return user;
}

const getPosts = async (user) => {
  const res = await fetch(`${url}/posts?userId=${user.id}&_limit=3`)
  const posts = await res.json();

  return posts;
}

const getCommentsForEachPost = async (posts) => {
  const res = await Promise.all(posts.map(post => 
    fetch(`${url}/comments?postId=${post.id}&_limit=4`)  
  ));
  console.log(res);
  const postComments = await Promise.all(res.map(r => r.json()));
  
  postComments.forEach((comments, i) => posts[i].comments = comments);
}


const getBlogContent = async () => {
  try {
    const user = await getUser(1);
    const posts = await getPosts(user);
    await getCommentsForEachPost(posts);

    posts.forEach(post => {
      content.innerHTML += `
      <div class="post">
        <h4>${post.title}</h4>
        <p>${post.body}</p>
        <br>
        ${post.comments.map(c => `<p><span>${c.email}:</span>${c.body}</p>`).join('')}
      </div>
      `;
    })
  } catch (err) {
    console.log(err);
  }
}

getBlogContent();

const loadAdds = () => {
  console.log('Adds loaded');
}

// test commit

// cambio 1

// cambio 2

// cambio 3