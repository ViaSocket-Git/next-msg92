import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import * as fs from "fs";
import { fetchPostContent } from '../../components/lib/posts';
import yaml  from "js-yaml";
import matter from 'gray-matter';
import Head from 'next/head';
import { format } from "date-fns";
import { useRouter } from 'next/router';
import  {getTag} from '@/components/lib/tags'
// import { SocialList } from '@/components/socialList';
import TagButton from '@/components/tagButton';
// import { SocialList } from '@/components/socialList';
import dynamic from 'next/dynamic'
import TagPostList from '@/components/tagPostList';
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
// const components = { Test }
const component = { ReactPlayer };
// console.log(component, "component");
const slugToPostContent = (postContents => {
 
  
    let hash = {}
    let fullPath = {}
    postContents.map((data)=>{
      fullPath = data.fullPath
    })
    postContents?.forEach(it => hash[it.slug] = it)
    return hash;
  })(fetchPostContent());
export default function TestPage({ source , title, author, date,thumbnailImage, tags}) {
  console.log(tags, "tags in testPage");
  const router  = useRouter();


  const handleClick = () =>{
    router.back();
  }
  return (
    <>
    <Head>
      <title>{title}</title>
    </Head>
    <div className="wrapper container blog-container">      
      <a href='javascript:void(0)' onClick={handleClick} >Back</a>
      <div className='blog-header mt-4'>
        <div>{author}, {date}</div>        
        <h1>{title}</h1>
        {thumbnailImage !=="" && <img className="" src={thumbnailImage} alt={author} />}
      </div>
      <div className="body">
        <MDXRemote {...source} components={component}/>
      </div>

      <button className="btn btn-dark mt-3" onClick={handleClick} >Back</button>
      <footer>
      {/* <div className={"social-list"}> 
        <SocialList date ={date}/>
      </div> */}
      <div>
      <ul className={"tag-list"}>
            {tags !=="" && tags?.map((it, i) => (
              <li key={i}>
                <TagButton tag={getTag(it)} />
              </li>
            ))}
          </ul>
      </div>
      </footer>
    </div>
    </>
  )
}

export async function getStaticPaths() {
  // const paths = [];
  const paths = fetchPostContent().map(it => "/guide/" + it.staticPath);
      // paths.push({
      //   params: {
      //     slug: "mastering-the-art-of-effective-communication-unveiling-the-secrets-to-successful-sms-campaigns-for-engaging-audiences"          
      //   },
      // });    
      console.log(paths, "path in slug");
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps(slug) {
  const slugData = slug.params.slug;
    const source = fs.readFileSync(slugToPostContent[slugData]?.fullPath, "utf8");
    const matterResult = matter(source, {
      engines: {
        yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
        // engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object }
      },
    });
    const thumbnailImage = matterResult?.data?.thumbnail;
    const title = matterResult?.data?.title;
    const author = matterResult?.data?.author;
    const content = matterResult?.content;
    const tags = matterResult?.data?.tags;
    console.log(tags, "tags in thumbnail");
    var date = new Date(matterResult?.data?.date);
    date = format(date, "LLLL d, yyyy")
  const mdxSource = await serialize(content)
  // const mdxSource = await renderToString(content, { scope: matterResult });
  // console.log(mdxSource,"generated");
  return { props: { source: mdxSource || "", title: title || "", author: author || "", date: date, thumbnailImage:thumbnailImage || "", tags: tags || ""} }
}