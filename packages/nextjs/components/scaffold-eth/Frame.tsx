import Head from "next/head";

export type FrameButton = {
  label: string;
  action: "post" | "post_redirect" | "link" | "mint" | "tx" | undefined;
  target: string | undefined;
  postUrl: string | undefined;
};

type FrameProps = {
  image: string;
  squareImage: boolean | undefined;
  fallbackImage: string | undefined;
  postUrl: string | undefined;
  buttons: FrameButton[];
};

export const Frame = ({ image, squareImage, fallbackImage, postUrl, buttons }: FrameProps) => {
  if (buttons && buttons.length > 4) {
    return <div>Error: frames should not contain more than 4 buttons.</div>;
  }

  const innerButtons = buttons.map(({ label, action, target, postUrl }: FrameButton, index: number) => {
    // eslint-disable-next-line react/jsx-key
    const ret = [<meta property={`fc:frame:button:${index}`} content={label} />];

    if (action) {
      ret.push(<meta property={`fc:frame:button:${index}:action`} content={action} />);
    }
    if (target) {
      ret.push(<meta property={`fc:frame:button:${index}:target`} content={target} />);
    }
    if (target) {
      ret.push(<meta property={`fc:frame:button:${index}:post_url`} content={postUrl} />);
    }

    return ret;
  });

  return (
    <div>
      <Head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={image} />
        <meta property="fc:frame:image:aspect_ratio" content={squareImage ? "1:1" : "1.91:1"} />
        if (fallbackImage) {<meta property="og:image" content={fallbackImage} />}
        if (postUrl) {<meta property="fc:frame:post_url" content={postUrl} />}
        {innerButtons}
      </Head>
    </div>
  );
};
