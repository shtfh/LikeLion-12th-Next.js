import path from 'path';
import fs from 'fs/promises';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}


export async function getStaticProps(context) {
  console.log('Re-Generating...');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json'); //여기 어렵당
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: '/no-data'
      }
    };
  }
  
  if (data.products.length === 0) {
    return { notFound: true };
  }
  

  return {
    props: {
      products: data.products
    },
    revalidate: 10,

  };
}


